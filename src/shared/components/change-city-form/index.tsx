import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';

interface Props {
  onSubmit: (value: string) => void;
}

export const ChangeCityForm: FC<Props> = ({ onSubmit }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('selected-city', inputValue);
    onSubmit(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className="w-2/3 relative md:w-1/2" onSubmit={(e) => handleSubmit(e)}>
      <input
        ref={inputRef}
        className="w-full h-[78px] text-2xl text-black p-2 pr-14 rounded-md md:h-[100px] md:p-8 md:pr-28 md:text-3xl"
        value={inputValue}
        onChange={(e) => handleChangeInput(e)}
      />
      <button
        disabled={!inputValue}
        type="submit"
        className="absolute right-0 h-full text-[#1086FF] text-xl px-4 md:text-4xl md:px-8">
        OK
      </button>
    </form>
  );
};
