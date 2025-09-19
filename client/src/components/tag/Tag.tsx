
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { TagProps } from "@uiTypes/ui";
import { notify } from "../../utils/toast";
function Tags({ values, onChange, field }: TagProps) {
    let convertValue;
    const [inputValue, setInputValue] = useState<string>("");
    const handleInputEnterData = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            if (values.length === 10) {
                notify(`The ${field} has maximum`, "error");
                return;
            }
            if (field === `sizes`) {
                convertValue = e.currentTarget.value.toUpperCase();
            } else {
                convertValue = e.currentTarget.value;
            }
            //Prevent submit event from child to parent
            onChange([...values, convertValue])
            setInputValue("");
        }
    }

    return (
        <div>
            <div className={`border-2 border-black rounded-md w-full flex flex-wrap p-1 ${field === `sizes` ? 'h-12' : 'h-24'}`}>
                {values && <div className="flex gap-1.5 flex-wrap w-fit">
                    {values.map((tag, index) =>
                        <span key={index} className="bg-blue-500 text-white rounded-md p-1 h-9 flex gap-2">
                            {tag}
                            <FontAwesomeIcon icon={faXmark} size="2xs" className="hover:cursor-pointer"
                                onClick={() => {
                                    const newValues = values.filter((_, i) => i !== index); // xoá theo index
                                    onChange(newValues); // báo ngược lên parent / form
                                }}
                            />
                        </span>
                    )}
                    {values.length <= 10 && (
                        <input
                            name="tag-values"
                            className="focus:outline-0 h-9 pl-2"
                            onKeyDown={handleInputEnterData}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    )}
                </div>
                }
            </div>
        </div>
    )
}

export default Tags