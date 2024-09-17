"use client";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiURL } from "@/hooks/use-api-url";

interface APIState {
   url: string | null;
}

export default function Settings() {
   const { url, setApiURL } = useApiURL();

   const form = useForm<APIState>({
      defaultValues: {
         url,
      },
   });

   const onSubmit = () => {
      setApiURL(form.getValues().url || undefined);
   };

   return (
      <main className="p-4 sm:p-8 lg:p-10">
         <div className="space-y-0.5">
            <div className="flex justify-between">
               <div className="flex space-x-2 flex-grow items-center">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                     Settings
                  </h2>
               </div>
            </div>
            <p className="text-muted-foreground text-sm">
               Manage your settings and preferences.
            </p>
         </div>

         <Separator className="mt-3 mb-6" />

         <div className="flex flex-col gap-4 md:gap-8">
            <Card>
               <CardHeader>
                  <CardTitle>API Settings</CardTitle>
               </CardHeader>
               <CardContent>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                     >
                        <FormField
                           control={form.control}
                           name="url"
                           render={({ field: { value, ..._fields } }) => (
                              <FormItem>
                                 <FormLabel>Api URL</FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="https://chatbot.example.com"
                                       value={value || undefined}
                                       {..._fields}
                                    />
                                 </FormControl>
                                 <FormDescription>
                                    Chatbot API to connect to
                                 </FormDescription>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <Button type="submit">Submit</Button>
                     </form>
                  </Form>
               </CardContent>
            </Card>
         </div>
      </main>
   );
}
