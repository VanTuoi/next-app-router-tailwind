"use client";

import { useState } from "react";

import { Button, Textarea } from "~/components/ui";

export const CourseComments = () => {
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        console.log("Comment submitted:", comment);
        setComment("");
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <h3 className="font-semibold">Bình luận</h3>
            <Textarea
                className="border-gray-400"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Viết bình luận của bạn..."
            />
            <Button className="bg-primary/80" onClick={handleSubmit} disabled={!comment.trim()}>
                Gửi bình luận
            </Button>
        </div>
    );
};
