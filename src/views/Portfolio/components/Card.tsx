import React, { useState } from "react";
import styled from "styled-components";


interface Props {
    data?: any
  }
const Card: React.FC<Props> = (props) => {
    const { image,link, heading1, heading2,description } = props.data;
    console.log(image)
    return (
        <>
          <div
                        className="flex flex-col rounded-lg shadow-slate-400 shadow-sm overflow-hidden"
                    >
                        <div className="flex-shrink-0">
                            <a href={link} target="_blank"
                                ><img
                                    className="h-48 w-full object-cover"
                                    src={`../images/portfolio/${image}`}
                                    alt="bleeps.art"
                            /></a>
                        </div>
                        <div
                            className="flex-1 bg-black p-6 flex flex-col justify-between"
                        >
                            <div className="flex-1">
                                <p className="text-xl font-medium text-yellow-300">
                                    <a
                                       href={link}
                                        target="_blank"
                                        className="underline"
                                        >{heading1}</a
                                    >
                                </p>
                                <div className="block mt-2">
                                    <p className="text-xl font-semibold text-gray-100">
                                    {heading2}
                                    </p>
                                    <p className="mt-3 text-base text-gray-300">
                                    {description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    );
};



export default Card;
