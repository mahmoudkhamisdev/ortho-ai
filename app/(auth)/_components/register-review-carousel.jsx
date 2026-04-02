"use client";

import { CustomCarousel } from "@/components/common/custom-carousel";
import { StarDisplay } from '@/components/common/star-display';
import UserAvatar from '@/components/common/user-avatar';
import { Card } from '@/components/ui/card';

export default function RegisterReviewCarousel({ testimonials }) {
    return (
        <CustomCarousel
            content={(item) => <RegisterReviewCard item={item} />}
            showPreviousArrow
            showNextArrow
            className="!basis-[100%]"
            data={testimonials}
        />
    );
}

const RegisterReviewCard = ({ item }) => {
    return (
        <Card className="bg-main border-main p-4 space-y-4 text-white rounded-3xl flex flex-col h-full flex-1">
            <div className="flex items-center justify-between h-full">
                <div className="flex flex-col items-center text-center gap-3">
                    <UserAvatar
                        name={item?.name}
                        image={item?.avatar}
                        className="w-14 h-14 text-sm"
                    />
                    <div className="flex-1">
                        <p
                            className="font-semibold text-sm line-clamp-3"
                            title={item?.comment}
                        >
                            {item?.comment}
                        </p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                            <StarDisplay rating={item?.rating} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};