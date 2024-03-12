"use client";
import React from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormControl, FormLabel, FormDescription } from "@/components/ui/form";
import { Link } from "lucide-react";
import { Button } from "react-day-picker";
import { Form, useForm } from "react-hook-form";
import UserEditZodSchema from "@/lib/validations";
import { updateUser } from "@/lib/actions/user.actions";
import { z } from "zod";
import { usePathname } from "next/navigation";
const Goal = ({ goal }: { goal: string }) => {
  return (
    <div className="order-1 flex items-center gap-2">
     
      <div className="size-3 rounded-full bg-primary-500" />
      <span className="paragraph-4-medium text-white-100">{goal}</span>
      <div>
        {goals.map((goal) => {
          return <Goal key={goal!} goal={goal} />;
        })}
      </div>
    </div>
  );
};
const EditGoals = ({_id, goals }: {_id:string, goals: string[] }) => {
  // Updated the type of 'goals' prop
  const pathname = usePathname();
  const form = useForm<z.infer<typeof UserEditZodSchema>>();
  const onSubmit = async () => { 
    const { learningGoals } = form.getValues();
    if (_id) {
      try {
        await updateUser({
          _id,
          updateData: { learningGoals },
          path: pathname,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="learningGoals"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
  {goals.map(()=>)}
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Use different settings for my mobile devices
                </FormLabel>
                <FormDescription>
                  You can manage your mobile notifications in the{" "}
                  <Link href="/examples/forms">mobile settings</Link> page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

  );
};

export default EditGoals;
