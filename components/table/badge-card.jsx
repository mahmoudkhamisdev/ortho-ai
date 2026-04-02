import { Card, CardContent } from "../ui/card";

export function BadgeCard({ title, secondTitle, count, Icon }) {
    return (
        <Card className="overflow-hidden !bg-gradient-to-tr from-primary/8 to-card">
            <CardContent>
                <div className="flex items-center justify-between gap-2 w-full">
                    <p className="font-bold text-xl capitalize">{title}</p>
                    <div className="bg-main/20 p-2 rounded-xl">
                        <Icon className="w-6 h-6 text-main" />
                    </div>
                </div>

                <div className="font-bold text-lg">{count}</div>
                <p className="font-bold text-xs text-muted-foreground">
                    {secondTitle || title}
                </p>
            </CardContent>
        </Card>
    );
}
