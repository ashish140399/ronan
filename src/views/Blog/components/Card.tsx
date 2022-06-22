import React, { useState } from "react";
import styled from "styled-components";

interface Props {
    data?: any;
}
const Card: React.FC<Props> = (props) => {
    const { image, link, heading, date } = props.data;
    console.log(image);
    return (
        <>
            <a
                href={link}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
                <div className="flex-shrink-0">
                    <img
                        className="h-48 w-full object-cover"
                        src={`../images/blog/${image}`}
                        alt={heading}
                    />
                </div>
                <div className="flex-1 bg-gray-900 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                        <a
                            href={link}
                            className="block mt-2"
                        >
                            <p className="text-xl font-semibold text-gray-100">
                                {heading}
                            </p>
                            <p className="mt-3 text-base text-gray-500">
                                {date}
                            </p>
                        </a>
                    </div>
                </div>{" "}
            </a>
        </>
    );
};

export default Card;
