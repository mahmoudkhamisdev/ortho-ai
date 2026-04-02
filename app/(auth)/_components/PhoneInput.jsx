import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import Flag from "react-world-flags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const PhoneInput = React.forwardRef(
  ({ className, onChange, ...props }, ref) => {
    return (
      <RPNInput.default
        ref={ref}
        className={cn("flex", className)}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={InputComponent}
        onChange={(value) => onChange?.(value || "")}
        defaultCountry="EG"
        {...props}
      />
    );
  }
);
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef(({ className, ...props }, ref) => (
  <Input
    className={cn(
      "rounded-s-none rounded-e-lg px-2 py-6 bg-background outline-none ",
      className
    )}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

const CountrySelect = ({ disabled, value, onChange, options }) => {
  const handleSelect = React.useCallback(
    (country) => {
      onChange(country);
    },
    [onChange]
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className={cn("flex gap-2 rounded-e-none rounded-s-lg px-3 py-6")}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          {value && (
            <span className="truncate">{`(${RPNInput.getCountryCallingCode(
              value
            )}+)`}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[300px] p-0">
        <Command>
          <CommandList>
            <ScrollArea className="h-72">
              <CommandInput placeholder="ابحث عن الدولة" dir="rtl" />
              <CommandEmpty>لم يتم العثور على أي دولة.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                      dir="rtl"
                      className={
                        option.value === value
                          ? "bg-main !text-white hover:!bg-main/80"
                          : "cursor-pointer"
                      }
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className="flex-1 text-sm">{option.label}</span>
                      {option.value && (
                        <span
                          className={cn(
                            "text-foreground/50 text-sm",
                            option.value === value && "!text-white"
                          )}
                        >
                          {`${RPNInput.getCountryCallingCode(option.value)}+`}
                        </span>
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }) => {
  //   const Flag = flags[country];
  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
      {Flag && <Flag code={country} />}
    </span>
  );
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };
