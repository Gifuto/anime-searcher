import { FC, PropsWithChildren } from "react";

type LoadProps = {};

type Apology = {}

export const Load: FC<PropsWithChildren<LoadProps>> = () => {
    return (
        <div className="w-[300px] mx-auto text-center">
            <h4 className="font-bold text-2xl text-violet-600">
                Loading<span className="animate-pulse">...</span>
            </h4>
        </div>
    );
};

export const Apology: FC<PropsWithChildren<Apology>> = () => {
    return(
        <div className="w-[300px] mx-auto text-center">
            <h4 className="font-bold text-2xl text-violet-600">
                Sorry<span className="animate-pulse">...</span>
            </h4>
        </div>
    )
}
