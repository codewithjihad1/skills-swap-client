"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfileHeader() {
    const { data: session } = useSession();

    if (!session) {
        return null;
    }
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={session?.user?.image || "/default-avatar.png"}
                                alt="Profile"
                            />
                            <AvatarFallback className="text-2xl">
                                {session?.user?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            size="icon"
                            variant="outline"
                            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
                        >
                            <Camera />
                        </Button>
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <h1 className="text-2xl font-bold">
                                {session?.user?.name}
                            </h1>
                            <Badge variant="secondary">Pro Member</Badge>
                        </div>
                        <p className="text-muted-foreground">
                            Senior Product Designer
                        </p>
                        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <Mail className="size-4" />
                                {session?.user?.email}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="size-4" />
                                {"Location not specified"}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                Joined {"Date not available"}
                            </div>
                        </div>
                    </div>
                    <Button variant="default">Edit Profile</Button>
                </div>
            </CardContent>
        </Card>
    );
}
