import { useThemeStore } from "@/hooks/use-theme";
// import { cn } from "@/lib/utils";
// import {
//    Tooltip,
//    TooltipContent,
//    TooltipTrigger,
// } from "@/components/ui/tooltip";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { ToggleGroup } from "@/components/ui/toggle-group";
// import { ToggleGroupItem } from "@radix-ui/react-toggle-group";

export function ThemeSwitcher() {
   // const { changeTheme, theme: currentTheme, toggleDarkMode } = useThemeStore();
   const { toggleDarkMode } = useThemeStore();

   // const themes = ["zinc", "rose", "blue", "green", "orange"];

   return (
      <div className="flex space-x-1">
         {/* <ToggleGroup
            type="single"
            className="space-x-0.5"
            defaultValue={currentTheme}
            onValueChange={(value) => changeTheme(value)}
         >
            {themes.map((theme) => (
               <Tooltip key={theme}>
                  <TooltipTrigger asChild>
                     <ToggleGroupItem
                        value={theme}
                        aria-label={`Toggle ${theme} theme`}
                        asChild
                     >
                        <Button
                           size="icon"
                           className={cn(
                              `h-6 w-6 rounded-full theme-${theme}`,
                              currentTheme == theme &&
                                 "ring-2 ring-offset-2 ring-ring"
                           )}
                        >
                           {theme == currentTheme && (
                              <CheckIcon className="h-4 w-4 text-white" />
                           )}
                        </Button>
                     </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent>{theme}</TooltipContent>
               </Tooltip>
            ))}
         </ToggleGroup> */}
         <Button variant="ghost" className="w-9 px-0" onClick={toggleDarkMode}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
         </Button>
      </div>
   );
}
