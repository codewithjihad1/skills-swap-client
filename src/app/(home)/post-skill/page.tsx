"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddSkillComponent from "@/components/skills/AddSkill";

// ✅ Zod schema
const FormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().nonempty({ message: "Category is required." }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  swapFor: z.string().nonempty({
    message: "Please specify at least one skill you want to swap for.",
  }),
  images: z.string().url().optional(),
  availability: z.string().nonempty({ message: "Availability is required." }),
  location: z.string().optional(),
  rating: z.enum(["1", "2", "3", "4", "5"]), // ⭐ rating added
});

function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "Beginner",
      swapFor: "",
      images: "",
      availability: "",
      location: "",
      rating: "5", // default rating
    },
  });

  // ✅ Submit handler with fixed fetch
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Submitted Data ✅", data);

    try {
      const res = await fetch("https://skills-swap-server.vercel.app/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to post skill");
      }

      toast.success("Skill posted successfully 🚀", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4 overflow-x-auto">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to post skill ❌");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Title</FormLabel>
              <FormControl>
                <Input placeholder="Learn Basic Photography" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the skill you can teach..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Videography">Videography</SelectItem>
                  <SelectItem value="SEO">SEO</SelectItem>
                  <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                  <SelectItem value="Logo Design">Logo Design</SelectItem>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Ethical Hacking">
                    Ethical Hacking
                  </SelectItem>
                  <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                  <SelectItem value="Journalism">Journalism</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Level */}
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Swap For */}
        <FormField
          control={form.control}
          name="swapFor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills You Want in Return</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Web Development, SEO" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Images */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://i.ibb.co/example.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Add one image URL for your skill post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Availability */}
        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability</FormLabel>
              <FormControl>
                <Input placeholder="Weekends, 6-8pm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Online / Dhaka City / Remote" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rating ⭐ */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rate Your Skill</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">⭐ 1</SelectItem>
                  <SelectItem value="2">⭐⭐ 2</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ 3</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ 4</SelectItem>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ 5</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

// export default function PostSkillPage() {
//   return (
//     <div className="p-6">
//       <h1 className="mb-4 text-2xl font-bold">Post a Skill</h1>
//       <InputForm />
//     </div>
//   );
// }
// export default function PostSkillPage() {
//   return (<AddSkillComponent />);
// }
