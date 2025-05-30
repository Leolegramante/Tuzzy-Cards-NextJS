import {cn} from "@/helpers/cs";

export function PageContainer({children, className}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("mx-auto w-full max-w-7xl h-full px-6 lg:px-8 py-4 bg-background min-h-svh", className)}>
            {children}
        </div>
    );
}