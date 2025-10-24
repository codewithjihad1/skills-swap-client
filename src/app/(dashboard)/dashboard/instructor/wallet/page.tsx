"use client";

import React, { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Wallet,
    TrendingUp,
    Clock,
    CheckCircle,
    Search,
    Download,
    DollarSign,
    CreditCard,
    Calendar,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    useInstructorWalletStats,
    useInstructorPayments,
    Payment,
} from "@/lib/api/wallet";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";

export default function InstructorWalletPage() {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [paymentMethodFilter, setPaymentMethodFilter] =
        useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: walletStats,
        isLoading: statsLoading,
        error: statsError,
    } = useInstructorWalletStats(userId || "");

    const {
        data: payments,
        isLoading: paymentsLoading,
        error: paymentsError,
    } = useInstructorPayments(userId || "", {
        status: statusFilter !== "all" ? statusFilter : undefined,
        limit: 50,
        page: currentPage,
    });

    // Filter payments based on search and payment method
    const filteredPayments = useMemo(() => {
        if (!payments) return [];

        return payments.filter((payment) => {
            const matchesSearch =
                searchQuery === "" ||
                payment.userEmail
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                payment.courseName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                payment.orderId
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesPaymentMethod =
                paymentMethodFilter === "all" ||
                payment.paymentMethod === paymentMethodFilter;

            return matchesSearch && matchesPaymentMethod;
        });
    }, [payments, searchQuery, paymentMethodFilter]);

    // Calculate payment method breakdown
    const paymentMethodData = useMemo(() => {
        if (!payments) return [];

        const completedPayments = payments.filter(
            (p) => p.status === "completed"
        );
        const methodCounts: Record<string, number> = {};

        completedPayments.forEach((payment) => {
            methodCounts[payment.paymentMethod] =
                (methodCounts[payment.paymentMethod] || 0) + payment.amount;
        });

        return Object.entries(methodCounts).map(([method, amount]) => ({
            name: method.charAt(0).toUpperCase() + method.slice(1),
            value: amount,
        }));
    }, [payments]);

    const COLORS = [
        "var(--color-primary)",
        "var(--color-secondary)",
        "var(--color-accent)",
        "#6366f1",
        "#8b5cf6",
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusBadgeVariant = (
        status: string
    ): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
            case "completed":
                return "default";
            case "pending":
            case "processing":
                return "secondary";
            case "failed":
            case "cancelled":
                return "destructive";
            default:
                return "outline";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-4 h-4" />;
            case "pending":
            case "processing":
                return <Clock className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const getInitials = (email: string) => {
        return email
            .split("@")[0]
            .split(".")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    if (!userId) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">
                    Please log in to view your wallet
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        Wallet
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your earnings and transactions
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-accent)]"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Earnings */}
                <Card className="border-l-4 border-l-[var(--color-primary)] hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Wallet className="w-4 h-4" />
                            Total Earnings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-32" />
                        ) : (
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-[var(--color-primary)]">
                                    {formatCurrency(
                                        walletStats?.totalEarnings || 0
                                    )}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* This Month */}
                <Card className="border-l-4 border-l-[var(--color-secondary)] hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            This Month
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-32" />
                        ) : (
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-[var(--color-secondary)]">
                                    {formatCurrency(
                                        walletStats?.thisMonthEarnings || 0
                                    )}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pending Amount */}
                <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Pending
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-32" />
                        ) : (
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-orange-500">
                                    {formatCurrency(
                                        walletStats?.pendingAmount || 0
                                    )}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Completed Transactions */}
                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-32" />
                        ) : (
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-green-500">
                                    {walletStats?.completedTransactions || 0}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    / {walletStats?.totalTransactions || 0}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Payment Method Breakdown */}
            {paymentMethodData.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
                            Payment Method Breakdown
                        </CardTitle>
                        <CardDescription>
                            Distribution of earnings by payment method
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={paymentMethodData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(props: any) => {
                                        const {
                                            cx,
                                            cy,
                                            midAngle,
                                            innerRadius,
                                            outerRadius,
                                            percent,
                                        } = props;

                                        const radius =
                                            Number(innerRadius) +
                                            (Number(outerRadius) -
                                                Number(innerRadius)) *
                                                0.5;
                                        const x =
                                            Number(cx) +
                                            radius *
                                                Math.cos(
                                                    (-Number(midAngle) *
                                                        Math.PI) /
                                                        180
                                                );
                                        const y =
                                            Number(cy) +
                                            radius *
                                                Math.sin(
                                                    (-Number(midAngle) *
                                                        Math.PI) /
                                                        180
                                                );

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill="white"
                                                textAnchor={
                                                    x > Number(cx)
                                                        ? "start"
                                                        : "end"
                                                }
                                                dominantBaseline="central"
                                                className="text-sm font-bold"
                                            >
                                                {`${(
                                                    Number(percent) * 100
                                                ).toFixed(0)}%`}
                                            </text>
                                        );
                                    }}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {paymentMethodData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) =>
                                        formatCurrency(value)
                                    }
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}

            {/* Transactions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[var(--color-primary)]" />
                        Transaction History
                    </CardTitle>
                    <CardDescription>
                        View and manage all your payment transactions
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by student, course, or order ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

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
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">
                                    Processing
                                </SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                                <SelectItem value="refunded">
                                    Refunded
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Payment Method Filter */}
                        <Select
                            value={paymentMethodFilter}
                            onValueChange={setPaymentMethodFilter}
                        >
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Payment method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Methods</SelectItem>
                                <SelectItem value="bkash">bKash</SelectItem>
                                <SelectItem value="nagad">Nagad</SelectItem>
                                <SelectItem value="card">Card</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Transactions List */}
                    {paymentsLoading ? (
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 p-4 border rounded-lg"
                                >
                                    <Skeleton className="w-12 h-12 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-3 w-32" />
                                    </div>
                                    <Skeleton className="h-6 w-24" />
                                </div>
                            ))}
                        </div>
                    ) : filteredPayments.length === 0 ? (
                        <div className="text-center py-12">
                            <Wallet className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                No transactions found
                            </h3>
                            <p className="text-muted-foreground">
                                {searchQuery ||
                                statusFilter !== "all" ||
                                paymentMethodFilter !== "all"
                                    ? "Try adjusting your filters"
                                    : "Your transaction history will appear here"}
                            </p>
                        </div>
                    ) : (
                        <ScrollArea className="h-[600px] pr-4">
                            <div className="space-y-3">
                                {filteredPayments.map((payment) => (
                                    <Card
                                        key={payment._id}
                                        className="hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-4">
                                                {/* Student Avatar */}
                                                <Avatar className="w-12 h-12">
                                                    <AvatarFallback className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
                                                        {getInitials(
                                                            payment.userEmail
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>

                                                {/* Transaction Details */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-semibold truncate">
                                                                {
                                                                    payment.userEmail
                                                                }
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground truncate">
                                                                {
                                                                    payment.courseName
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-[var(--color-primary)]">
                                                                {formatCurrency(
                                                                    payment.amount
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {formatDate(
                                                                payment.completedAt ||
                                                                    payment.createdAt
                                                            )}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <CreditCard className="w-3 h-3" />
                                                            {payment.paymentMethod.toUpperCase()}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="font-mono">
                                                            {payment.orderId}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Badge
                                                            variant={getStatusBadgeVariant(
                                                                payment.status
                                                            )}
                                                            className="capitalize"
                                                        >
                                                            {getStatusIcon(
                                                                payment.status
                                                            )}
                                                            <span className="ml-1">
                                                                {payment.status}
                                                            </span>
                                                        </Badge>
                                                        {payment.trxID && (
                                                            <span className="text-xs text-muted-foreground font-mono">
                                                                TrxID:{" "}
                                                                {payment.trxID}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
