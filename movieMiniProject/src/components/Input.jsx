import { useState } from "react";
import { useModeStore } from "../store/ModeStore";

const Input = ({
  type,
  placeHolder,
  value,
  setValue,
  pattern,
  errorMessage,
  compareValue = null,
}) => {
  const [isError, setIsError] = useState(false);
  const { isDark } = useModeStore();

  const handleChange = (e) => {
    setValue(e.target.value);

    const isValid = e.target.validity.valid;
    // console.log(e.target.validity);
    const isMatch = compareValue === null || compareValue === e.target.value;
    setIsError(!isValid || !isMatch);
  };
  return (
    <>
      <label className="flex flex-col gap-1">
        <input
          type={type}
          placeholder={placeHolder}
          value={value}
          pattern={pattern}
          required
          className={`w-[300px] h-10 p-[0_25px] rounded-full ${
            isDark ? `bg-[#ffffff7a]` : `bg-[#0000003d]`
          }`}
          onChange={handleChange}
        />
        {isError && <p className="text-[#790000]">{errorMessage}</p>}
      </label>
    </>
  );
};

export default Input;
