import React from "react";
import { motion } from "framer-motion";
import {
    Star,
    Clock,
    Users,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    TrendingUp,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui/badge";

const SkillCard = ({ skillData, index }: any) => {
    return (
        <motion.div
            key={skillData.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage
                                    src={skillData?.avatar || skillData?.image}
                                    alt={skillData.title}
                                />
                                <AvatarFallback>
                                    {skillData.title.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                                    {skillData.title}
                                </CardTitle>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {skillData.category}
                                </p>
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <Badge
                            variant={
                                skillData.isActive === "active"
                                    ? "default"
                                    : "secondary"
                            }
                            className={
                                skillData.isActive === "active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : ""
                            }
                        >
                            {skillData.isActive}
                        </Badge>
                        <Badge variant="outline">{skillData.level}</Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* <p className="text-sm text-gray-600 dark:text-gray-300">
                        {skillData.description}
                    </p> */}

                    <div className="flex flex-wrap gap-1">
                        {skillData.tags.map((tag: string) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">
                                {skillData.rating}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">
                                {skillData.swapCount} students
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="text-sm">
                                {skillData?.sessions || 0} sessions
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-purple-500" />
                            <span className="text-sm font-medium">
                                ${skillData?.earnings || 0}
                            </span>
                        </div>
                    </div>

                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Manage Skill
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default SkillCard;
