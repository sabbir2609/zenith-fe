import { person1, person2, person3, person4 } from "@/public/static";
import { MoveRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FeedbackDisplay() {

    const feedback = [
        {
            id: 1,
            user: "John Doe",
            img: person1,
            rating: 4,
            feedback: "This is a great product. I love it!"
        },
        {
            id: 2,
            user: "Jane Doe",
            img: person2,
            rating: 5,
            feedback: "Nice Hotel. I will definitely come back again!"
        },
        {
            id: 3,
            user: "John Smith",
            img: person3,
            rating: 3,
            feedback: "Good service but the food was not great."
        },
        {
            id: 4,
            user: "Jane Smith",
            img: person4,
            rating: 4,
            feedback: "I love the hotel but the room was not clean."
        }
    ]


    return (
        <div className="flex flex-col m-2">
            <div className="flex flex-row items-center">
                <h1 className="text-lg lg:text-xl font-bold">Feedback</h1>
                <Link href="/dashboard/feedback" className="btn btn-sm btn-square rounded-sm ml-4">
                    <MoveRight className="cursor-pointer" />
                </Link>
            </div>
            <div className="flex flex-col p-2">
                {feedback.map((item) => (
                    <div key={item.id} className="flex flex-row items-center p-2">
                        <Image src={item.img} alt="user" className="w-16 h-16 rounded-full" />

                        <div className="flex flex-col ps-2">
                            <h1 className="text-lg font-bold">{item.user}</h1>
                            <div className="flex flex-row items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star size={16} key={star} className={`${star <= item.rating ? "text-yellow-400" : "text-gray-300"}`} />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">{item.feedback}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}