import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ value, onClick, onChange, placeholder, className, isDisabled }, ref) => (
    <input
        id="datepicker-input"
        value={value}
        onClick={onClick}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        disabled={isDisabled}
        ref={ref}
        readOnly
    />
));

CustomInput.displayName = "CustomInput";

const CustomTimeInput = ({ date, onChange }) => {
    const value = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
    const hours24 = value.getHours();
    const minutes = value.getMinutes();

    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 || 12;

    const handleTimeChange = (newHours12, newMinutes, newPeriod) => {
        let h = parseInt(newHours12);
        if (newPeriod === "PM" && h < 12) h += 12;
        if (newPeriod === "AM" && h === 12) h = 0;
        onChange(`${String(h).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`);
    };

    return (
        <div className="custom-time-container flex items-center justify-center gap-1 p-2 bg-gray-50 rounded-lg mt-2 mb-1 border border-divider">
            <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase text-gray500 mb-1">Hour</span>
                <select 
                    value={hours12} 
                    onChange={(e) => handleTimeChange(e.target.value, minutes, period)}
                    className="time-select-dropdown bg-white border border-divider rounded px-1 py-1 text-sm focus:ring-1 focus:ring-success_main outline-none"
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                        <option key={h} value={h}>{h}</option>
                    ))}
                </select>
            </div>
            <span className="mt-4 font-bold">:</span>
            <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase text-gray500 mb-1">Min</span>
                <select 
                    value={minutes} 
                    onChange={(e) => handleTimeChange(hours12, e.target.value, period)}
                    className="time-select-dropdown bg-white border border-divider rounded px-1 py-1 text-sm focus:ring-1 focus:ring-success_main outline-none"
                >
                    {Array.from({ length: 60 }, (_, i) => i).map(m => (
                        <option key={m} value={m}>{String(m).padStart(2, "0")}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col items-center ml-1">
                <span className="text-[10px] uppercase text-gray500 mb-1">Period</span>
                <select 
                    value={period} 
                    onChange={(e) => handleTimeChange(hours12, minutes, e.target.value)}
                    className="time-select-dropdown bg-white border border-divider rounded px-1 py-1 text-sm focus:ring-1 focus:ring-success_main outline-none"
                >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
        </div>
    );
};

const DatePicker = ({ inputClass, isDisabled, label, onChange, value, currentWork, placeholder, onChangeCheckBox, checked, checkName, checkId, disablePast = false }) => {
    // Determine the value to pass to react-datepicker
    // It expects a Date object
    let selectedDate = null;
    if (value instanceof Date) {
        selectedDate = !isNaN(value.getTime()) ? value : null;
    } else if (value && typeof value === "object" && value.year) {
        selectedDate = new Date(value.year, value.month - 1, value.day, value.hour || 0, value.minute || 0);
    } else if (typeof value === "string" && value.trim() !== "") {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            selectedDate = date;
        }
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const handleChange = (nextDate) => {
        if (disablePast && nextDate instanceof Date && nextDate < new Date()) {
            onChange(new Date());
            return;
        }

        onChange(nextDate);
    };

    return (
        <div className="datepicker-wrapper">
            <div className="flex items-center">
                {label && (
                    <label htmlFor="datepicker-input" className="font-semibold mb-2">
                        {label}
                    </label>
                )}
                {currentWork && (
                    <div className="flex items-center gap-1 ml-2 mb-2">
                        <input
                            type="checkbox"
                            id={checkId}
                            name={checkName}
                            checked={checked}
                            onChange={onChangeCheckBox}
                            className={`w-3 h-3 ${checked ? "bg-primary border-black" : "bg-gray-100"} !text-subtitle1`}
                        />
                        <p className="text-subtitle2">Currently worked here</p>
                    </div>
                )}
            </div>
            <ReactDatePicker
                selected={selectedDate}
                onChange={handleChange}
                minDate={disablePast ? today : undefined}
                showTimeInput
                customTimeInput={<CustomTimeInput />}
                timeInputLabel="Select Time:"
                dateFormat="MMMM d, yyyy h:mm aa"
                disabled={isDisabled}
                placeholderText={placeholder}
                customInput={<CustomInput className={inputClass} isDisabled={isDisabled} />}
                popperPlacement="bottom-start"
            />
        </div>
    );
};


export default DatePicker;

