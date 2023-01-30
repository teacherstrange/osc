import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Switch } from 'osc-ui';

export interface Props {
    label: string;
    onToggle: (isChecked: boolean) => void;
    isChecked: boolean;
}

export const ThemeSwitcher = (props: Props) => {
    const { label, onToggle, isChecked } = props;

    return (
        <>
            <label htmlFor="color-mode-toggle" className="sr-only">
                {label}
            </label>
            <MoonIcon />

            <Switch
                checked={isChecked}
                onCheckedChange={(isChecked) => onToggle(isChecked)}
                id="color-mode-toggle"
            />

            <SunIcon />
        </>
    );
};
