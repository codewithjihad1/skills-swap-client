"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import {
    Users,
    Shield,
    Ban,
    CheckCircle,
    Search,
    MoreVertical,
    Trash2,
    Eye,
    RefreshCw,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useAllUsers,
    useUserStats,
    updateUserRole,
    updateUserStatus,
    deleteUser,
    User,
} from "@/lib/api/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ManageUsersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [actionDialog, setActionDialog] = useState<{
        open: boolean;
        action: "role" | "status" | "delete" | null;
        newRole?: string;
        newStatus?: string;
    }>({ open: false, action: null });
    const [isUpdating, setIsUpdating] = useState(false);

    const itemsPerPage = 10;

    useEffect(() => {
        if (status === "loading") return;

        const userRole = (session?.user as any)?.role;
        if (!session || userRole !== "admin") {
            router.push("/dashboard");
            return;
        }
        setLoading(false);
    }, [session, status, router]);

    const {
        data: usersData,
        isLoading: usersLoading,
        refetch: refetchUsers,
    } = useAllUsers({
        role: roleFilter !== "all" ? roleFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        limit: 100,
        page: 1,
        search: searchQuery,
    });

    const { data: userStats, isLoading: statsLoading } = useUserStats();

    // Filter and paginate users
    const filteredUsers = useMemo(() => {
        if (!usersData?.users) return [];
        return usersData.users;
    }, [usersData]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredUsers.slice(startIndex, endIndex);
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            case "instructor":
                return "bg-[var(--color-primary)]/20 text-[var(--color-primary)]";
            default:
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
            case "suspended":
            case "banned":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
        }
    };

    const handleRoleChange = (user: User, newRole: string) => {
        setSelectedUser(user);
        setActionDialog({
            open: true,
            action: "role",
            newRole,
        });
    };

    const handleStatusChange = (user: User, newStatus: string) => {
        setSelectedUser(user);
        setActionDialog({
            open: true,
            action: "status",
            newStatus,
        });
    };

    const handleDeleteUser = (user: User) => {
        setSelectedUser(user);
        setActionDialog({
            open: true,
            action: "delete",
        });
    };

    const confirmAction = async () => {
        if (!selectedUser || !actionDialog.action) return;

        setIsUpdating(true);

        try {
            let result;

            switch (actionDialog.action) {
                case "role":
                    if (actionDialog.newRole) {
                        result = await updateUserRole(
                            selectedUser._id,
                            actionDialog.newRole as any
                        );
                        if (result.success) {
                            toast.success("User role updated successfully");
                        } else {
                            toast.error(
                                result.error || "Failed to update role"
                            );
                        }
                    }
                    break;

                case "status":
                    if (actionDialog.newStatus) {
                        result = await updateUserStatus(
                            selectedUser._id,
                            actionDialog.newStatus as any
                        );
                        if (result.success) {
                            toast.success("User status updated successfully");
                        } else {
                            toast.error(
                                result.error || "Failed to update status"
                            );
                        }
                    }
                    break;

                case "delete":
                    result = await deleteUser(selectedUser._id);
                    if (result.success) {
                        toast.success("User deleted successfully");
                    } else {
                        toast.error(result.error || "Failed to delete user");
                    }
                    break;
            }

            // Refetch users
            await queryClient.invalidateQueries({ queryKey: ["all-users"] });
            await queryClient.invalidateQueries({ queryKey: ["user-stats"] });
            refetchUsers();
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsUpdating(false);
            setActionDialog({ open: false, action: null });
            setSelectedUser(null);
        }
    };

    if (loading || status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        User Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage all users, roles, and permissions
                    </p>
                </div>
                <Button
                    onClick={() => refetchUsers()}
                    variant="outline"
                    className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-accent)]"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-[var(--color-primary)] hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Total Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <div className="text-3xl font-bold text-[var(--color-primary)]">
                                {userStats?.totalUsers.toLocaleString() || 0}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Active Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <div className="text-3xl font-bold text-green-500">
                                {userStats?.activeUsers.toLocaleString() || 0}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-[var(--color-secondary)] hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Instructors
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <div className="text-3xl font-bold text-[var(--color-secondary)]">
                                {userStats?.instructors || 0}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Ban className="h-4 w-4" />
                            Suspended
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <div className="text-3xl font-bold text-red-500">
                                {userStats?.suspendedUsers || 0}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Role Filter */}
                        <Select
                            value={roleFilter}
                            onValueChange={setRoleFilter}
                        >
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="instructor">
                                    Instructor
                                </SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Status Filter */}
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="suspended">
                                    Suspended
                                </SelectItem>
                                <SelectItem value="banned">Banned</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Users ({filteredUsers.length})</CardTitle>
                    <CardDescription>
                        Showing {paginatedUsers.length} of{" "}
                        {filteredUsers.length} users
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {usersLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4"
                                >
                                    <Skeleton className="w-12 h-12 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-3 w-32" />
                                    </div>
                                    <Skeleton className="h-8 w-20" />
                                    <Skeleton className="h-8 w-20" />
                                </div>
                            ))}
                        </div>
                    ) : paginatedUsers.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                No users found
                            </h3>
                            <p className="text-muted-foreground">
                                {searchQuery ||
                                roleFilter !== "all" ||
                                statusFilter !== "all"
                                    ? "Try adjusting your filters"
                                    : "No users available"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Joined Date</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedUsers.map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="w-10 h-10">
                                                            <AvatarImage
                                                                src={
                                                                    user.avatar
                                                                }
                                                                alt={user.name}
                                                            />
                                                            <AvatarFallback className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
                                                                {getInitials(
                                                                    user.name
                                                                )}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">
                                                                {user.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-mono text-sm">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={getRoleColor(
                                                            user.role
                                                        )}
                                                    >
                                                        {user.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={getStatusColor(
                                                            user.status ||
                                                                "active"
                                                        )}
                                                    >
                                                        {user.status ||
                                                            "active"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(user.createdAt)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                <MoreVertical className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>
                                                                Actions
                                                            </DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuLabel>
                                                                Change Role
                                                            </DropdownMenuLabel>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleRoleChange(
                                                                        user,
                                                                        "user"
                                                                    )
                                                                }
                                                            >
                                                                Set as User
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleRoleChange(
                                                                        user,
                                                                        "instructor"
                                                                    )
                                                                }
                                                            >
                                                                Set as
                                                                Instructor
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleRoleChange(
                                                                        user,
                                                                        "admin"
                                                                    )
                                                                }
                                                            >
                                                                Set as Admin
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuLabel>
                                                                Change Status
                                                            </DropdownMenuLabel>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        user,
                                                                        "active"
                                                                    )
                                                                }
                                                            >
                                                                Set Active
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        user,
                                                                        "suspended"
                                                                    )
                                                                }
                                                            >
                                                                Suspend
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        user,
                                                                        "banned"
                                                                    )
                                                                }
                                                            >
                                                                Ban
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleDeleteUser(
                                                                        user
                                                                    )
                                                                }
                                                                className="text-red-600"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete User
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Page {currentPage} of {totalPages}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.max(1, prev - 1)
                                                )
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.min(
                                                        totalPages,
                                                        prev + 1
                                                    )
                                                )
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog
                open={actionDialog.open}
                onOpenChange={(open) => setActionDialog({ open, action: null })}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {actionDialog.action === "delete"
                                ? "Delete User"
                                : actionDialog.action === "role"
                                ? "Change User Role"
                                : "Change User Status"}
                        </DialogTitle>
                        <DialogDescription>
                            {actionDialog.action === "delete"
                                ? `Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`
                                : actionDialog.action === "role"
                                ? `Are you sure you want to change ${selectedUser?.name}'s role to ${actionDialog.newRole}?`
                                : `Are you sure you want to change ${selectedUser?.name}'s status to ${actionDialog.newStatus}?`}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setActionDialog({ open: false, action: null })
                            }
                            disabled={isUpdating}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmAction}
                            disabled={isUpdating}
                            variant={
                                actionDialog.action === "delete"
                                    ? "destructive"
                                    : "default"
                            }
                            className={
                                actionDialog.action !== "delete"
                                    ? "bg-[var(--color-primary)] hover:bg-[var(--color-secondary)]"
                                    : ""
                            }
                        >
                            {isUpdating ? "Processing..." : "Confirm"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
