"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, Video } from "lucide-react";
import { format } from "date-fns";
import { useScheduleSession } from "@/lib/api/sessions";

interface ScheduleSessionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    swapRequestId: string;
    skillTitle: string;
}

export function ScheduleSessionDialog({
    open,
    onOpenChange,
    swapRequestId,
    skillTitle,
}: ScheduleSessionDialogProps) {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("10:00");
    const [duration, setDuration] = useState<string>("60");
    const [notes, setNotes] = useState<string>("");

    const scheduleSessionMutation = useScheduleSession();

    const handleSchedule = async () => {
        if (!selectedDate) {
            return;
        }

        // Combine date and time
        const [hours, minutes] = selectedTime.split(":").map(Number);
        const scheduledDateTime = new Date(selectedDate);
        scheduledDateTime.setHours(hours, minutes, 0, 0);

        try {
            await scheduleSessionMutation.mutateAsync({
                swapRequestId,
                scheduledDate: scheduledDateTime.toISOString(),
                duration: parseInt(duration),
                notes: notes.trim() || undefined,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });

            // Reset form and close dialog
            setSelectedDate("");
            setSelectedTime("10:00");
            setDuration("60");
            setNotes("");
            onOpenChange(false);
        } catch (error) {
            // Error is handled by the mutation
            console.error("Failed to schedule session:", error);
        }
    };

    // Generate time slots
    const timeSlots = Array.from({ length: 48 }, (_, i) => {
        const hour = Math.floor(i / 2);
        const minute = i % 2 === 0 ? "00" : "30";
        return `${hour.toString().padStart(2, "0")}:${minute}`;
    });

    // Get minimum date (today)
    const today = new Date().toISOString().split("T")[0];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-primary" />
                        Schedule Session
                    </DialogTitle>
                    <DialogDescription>
                        Schedule a skill exchange session for{" "}
                        <span className="font-semibold text-primary">
                            {skillTitle}
                        </span>
                        . A Google Meet link will be created automatically.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Date Selection */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            Select Date
                        </Label>
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={today}
                            className="w-full"
                        />
                        {selectedDate && (
                            <p className="text-sm text-muted-foreground">
                                Selected:{" "}
                                {format(
                                    new Date(selectedDate),
                                    "EEEE, MMMM d, yyyy"
                                )}
                            </p>
                        )}
                    </div>

                    {/* Time Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Time
                            </Label>
                            <Select
                                value={selectedTime}
                                onValueChange={setSelectedTime}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Duration</Label>
                            <Select
                                value={duration}
                                onValueChange={setDuration}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="30">
                                        30 minutes
                                    </SelectItem>
                                    <SelectItem value="60">1 hour</SelectItem>
                                    <SelectItem value="90">
                                        1.5 hours
                                    </SelectItem>
                                    <SelectItem value="120">2 hours</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label>Notes (Optional)</Label>
                        <Textarea
                            placeholder="Add any notes or agenda items for this session..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="resize-none"
                        />
                    </div>

                    {/* Info Box */}
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 space-y-2">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            What happens next?
                        </p>
                        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
                            <li>A Google Calendar event will be created</li>
                            <li>A Google Meet link will be generated</li>
                            <li>
                                All participants will receive email invitations
                            </li>
                            <li>Reminders will be sent before the session</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={scheduleSessionMutation.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSchedule}
                        disabled={
                            !selectedDate || scheduleSessionMutation.isPending
                        }
                    >
                        {scheduleSessionMutation.isPending ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                Scheduling...
                            </>
                        ) : (
                            <>
                                <Video className="h-4 w-4 mr-2" />
                                Schedule Session
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
