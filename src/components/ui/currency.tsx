export default function Currency({
    value,
    type,
    visibleSign,
    transferOut,
}: {
    value: number;
    type: string;
    visibleSign?: boolean;
    transferOut?: boolean;
}) {
    let color = "";
    let signValue = value;
    if (type === "income") {
        color = "text-emerald-400";
    } else if (type === "expense") {
        color = "text-red-500";
        signValue = -value;
    } else if (type == "transfer") {
        color = "text-blue-400";
        signValue = transferOut ? -value : value;
    } else if (type === "auto") {
        if (value >= 0) {
            color = "text-emerald-400";
        } else {
            color = "text-red-500";
            signValue = -value;
        }
    }
    return (
        <span className={color}>
            {(visibleSign ? signValue : value).toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
            })}
        </span>
    );
}
