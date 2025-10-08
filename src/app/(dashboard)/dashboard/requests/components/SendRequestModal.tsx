"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCreateSwapRequest } from "@/lib/api/swapRequests";
import { Send } from "lucide-react";

interface SendRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    availableSkills?: any[];
}

export function SendRequestModal({
    isOpen,
    onClose,
    availableSkills = [],
}: SendRequestModalProps) {
    const { data: session } = useSession();
    const [selectedSkillOffered, setSelectedSkillOffered] = useState("");
    const [selectedSkillRequested, setSelectedSkillRequested] = useState("");
    const [message, setMessage] = useState("");
    const createMutation = useCreateSwapRequest();

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setSelectedSkillOffered("");
            setSelectedSkillRequested("");
            setMessage("");
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!session?.user?.id) return;
        if (!selectedSkillOffered || !selectedSkillRequested) return;

        // Find the skill provider from the selected skill
        const requestedSkill = availableSkills.find(
            (s) => s._id === selectedSkillRequested
        );
        if (!requestedSkill?.userId) return;

        await createMutation.mutateAsync({
            requester: session.user.id,
            skillOffered: selectedSkillOffered,
            skillProvider: requestedSkill.userId,
            skillRequested: selectedSkillRequested,
            message,
        });

        onClose();
    };

    const userSkills = availableSkills.filter(
        (skill) => skill.userId === session?.user?.id
    );
    const otherSkills = availableSkills.filter(
        (skill) => skill.userId !== session?.user?.id
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Send Swap Request</DialogTitle>
                    <DialogDescription>
                        Select the skill you want to offer and the skill you
                        want to learn
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="skillOffered">Skill You Offer</Label>
                        <Select
                            value={selectedSkillOffered}
                            onValueChange={setSelectedSkillOffered}
                        >
                            <SelectTrigger id="skillOffered">
                                <SelectValue placeholder="Select a skill you can teach" />
                            </SelectTrigger>
                            <SelectContent>
                                {userSkills.map((skill) => (
                                    <SelectItem
                                        key={skill._id}
                                        value={skill._id}
                                    >
                                        {skill.title} - {skill.category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="skillRequested">
                            Skill You Want to Learn
                        </Label>
                        <Select
                            value={selectedSkillRequested}
                            onValueChange={setSelectedSkillRequested}
                        >
                            <SelectTrigger id="skillRequested">
                                <SelectValue placeholder="Select a skill you want to learn" />
                            </SelectTrigger>
                            <SelectContent>
                                {otherSkills.map((skill) => (
                                    <SelectItem
                                        key={skill._id}
                                        value={skill._id}
                                    >
                                        {skill.title} - {skill.category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea
                            id="message"
                            placeholder="Introduce yourself and explain why you're interested..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={
                                !selectedSkillOffered ||
                                !selectedSkillRequested ||
                                createMutation.isPending
                            }
                        >
                            <Send className="h-4 w-4 mr-2" />
                            {createMutation.isPending
                                ? "Sending..."
                                : "Send Request"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
