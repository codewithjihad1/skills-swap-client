"use client";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "@/axios/axiosInstance";

interface BookingScheduleProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const BookingSchedule = ({ open, setOpen }: BookingScheduleProps) => {
    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [date, setDate] = React.useState<Date | null>(new Date());
    const [startTime, setStartTime] = React.useState<Date | null>(new Date());
    const [endTime, setEndTime] = React.useState<Date | null>(new Date());

    const handleCreate = async () => {
        try {
            const res = await axiosInstance.post("/api/schedule", {
                title,
                desc,
                date,
                startTime,
                endTime,
            });
            const data = await res.data;

            console.log("Meet Link Response:", data);
            if (data.meetLink) alert("Google Meet Link: " + data.meetLink);
            else alert("Meet link not generated!");

            setOpen(false);
        } catch (err) {
            console.error(err);
            alert("Error creating event");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg space-y-4">
                <DialogHeader>
                    <DialogTitle>Schedule a Session</DialogTitle>
                </DialogHeader>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full input input-bordered"
                />
                <textarea
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full textarea textarea-bordered"
                />
                <div className="flex gap-2">
                    <DatePicker
                        selected={date}
                        onChange={(date: Date | null) => setDate(date)}
                        className="input input-bordered w-full"
                    />
                    <DatePicker
                        selected={startTime}
                        onChange={(date: Date | null) => setStartTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Start"
                        dateFormat="h:mm aa"
                        className="input input-bordered w-full"
                    />
                    <DatePicker
                        selected={endTime}
                        onChange={(date: Date | null) => setEndTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="End"
                        dateFormat="h:mm aa"
                        className="input input-bordered w-full"
                    />
                </div>

                <Button
                    onClick={handleCreate}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                    Create Event
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default BookingSchedule;
