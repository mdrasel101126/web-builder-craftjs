import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Video, FileText, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HelpCenter() {
  const resources = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using our community platform",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      link: "#",
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides for common tasks",
      icon: <Video className="h-8 w-8 text-primary" />,
      link: "#",
    },
    {
      title: "Documentation",
      description: "Detailed documentation for all features",
      icon: <FileText className="h-8 w-8 text-primary" />,
      link: "#",
    },
    {
      title: "Tips & Tricks",
      description: "Helpful tips to get the most out of the platform",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      link: "#",
    },
  ];

  const popularTopics = [
    "How to create a post",
    "Managing your profile",
    "Privacy settings",
    "Notification preferences",
    "Blocking and reporting users",
    "Account security",
  ];

  return (
    <div className="space-y-8 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Card
            key={index}
            className="overflow-hidden"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                {resource.icon}
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <Link href={resource.link}>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <CardTitle className="mt-4">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Help Topics</CardTitle>
          <CardDescription>
            Quick answers to the most common questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {popularTopics.map((topic, index) => (
              <Link
                key={index}
                href="#"
                className="flex items-center p-3 rounded-md hover:bg-muted transition-colors"
              >
                <span className="text-sm font-medium">{topic}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
