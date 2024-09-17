"use client";

import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarRadioGroup,
   MenubarRadioItem,
   MenubarSeparator,
   MenubarShortcut,
   MenubarSub,
   MenubarSubContent,
   MenubarSubTrigger,
   MenubarTrigger,
} from "@/components/ui/menubar";
import { toggleSidebarVisibility } from "@/store/use-sidebar-store";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

export function Menu() {
   const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
         document.documentElement.requestFullscreen().catch((err) => {
            console.error(
               "Error attempting to enable full-screen mode:",
               err.message
            );
         });
      } else {
         if (document.exitFullscreen) {
            document.exitFullscreen();
         }
      }
   };

   return (
      <Menubar className="border-none rounded-none text-foreground">
         <MenubarMenu>
            <MenubarTrigger className="font-bold">Shield</MenubarTrigger>
            <MenubarContent>
               <Link href="/" passHref>
                  <MenubarItem onSelect={() => {}}>Dashboard</MenubarItem>
               </Link>
               <MenubarSeparator />
               <MenubarItem>
                  <Link href="/settings">Settings...</Link>
               </MenubarItem>
               <MenubarItem onSelect={() => {}}>Logout</MenubarItem>
            </MenubarContent>
         </MenubarMenu>

         <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
               <MenubarItem onSelect={() => {}}>Toggle Theme</MenubarItem>
               <MenubarItem onSelect={toggleFullscreen}>
                  Toggle Fullscreen
               </MenubarItem>
               <MenubarSeparator />
               <MenubarItem onSelect={toggleSidebarVisibility}>
                  Toggle Sidebar
               </MenubarItem>
               <MenubarSeparator />
               <MenubarItem disabled>Reload</MenubarItem>
               <MenubarItem onSelect={() => window.location.reload()}>
                  Force Reload <MenubarShortcut>⌘R</MenubarShortcut>
               </MenubarItem>
            </MenubarContent>
         </MenubarMenu>

         <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
               <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
               </MenubarItem>
               <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
               </MenubarItem>
               <MenubarItem disabled>New Incognito Window</MenubarItem>
               <MenubarSeparator />
               <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                     <MenubarItem>Email link</MenubarItem>
                     <MenubarItem>Messages</MenubarItem>
                     <MenubarItem>Notes</MenubarItem>
                  </MenubarSubContent>
               </MenubarSub>
               <MenubarSeparator />
               <MenubarItem>
                  Print... <MenubarShortcut>⌘P</MenubarShortcut>
               </MenubarItem>
            </MenubarContent>
         </MenubarMenu>

         <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
               <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
               </MenubarItem>
               <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
               </MenubarItem>
               <MenubarSeparator />
               <MenubarSub>
                  <MenubarSubTrigger>Find</MenubarSubTrigger>
                  <MenubarSubContent>
                     <MenubarItem>Search the web</MenubarItem>
                     <MenubarSeparator />
                     <MenubarItem>Find...</MenubarItem>
                     <MenubarItem>Find Next</MenubarItem>
                     <MenubarItem>Find Previous</MenubarItem>
                  </MenubarSubContent>
               </MenubarSub>
               <MenubarSeparator />
               <MenubarItem>Cut</MenubarItem>
               <MenubarItem>Copy</MenubarItem>
               <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
         </MenubarMenu>

         <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
               <MenubarRadioGroup value="benoit">
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
               </MenubarRadioGroup>
               <MenubarSeparator />
               <MenubarItem inset>Edit...</MenubarItem>
               <MenubarSeparator />
               <MenubarItem inset>Add Profile...</MenubarItem>
            </MenubarContent>
         </MenubarMenu>

         <div className="hidden p-1 w-full sm:flex items-center justify-end">
            <ThemeSwitcher />
         </div>
      </Menubar>
   );
}
