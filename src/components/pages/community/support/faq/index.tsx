"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faqs } from "@/lib/data/community";

export function Faq() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getFaqsByCategory = (category: string) => {
    return filteredFaqs.filter((faq) => faq.category === category);
  };

  return (
    <div className="space-y-6 m-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search FAQs..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue={categories[0]}>
        <TabsList className="w-full flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="flex-1 capitalize"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent
            key={category}
            value={category}
            className="mt-6"
          >
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {getFaqsByCategory(category).length > 0 ? (
                getFaqsByCategory(category).map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                  >
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <div className="py-4 text-center text-muted-foreground">
                  No FAQs found matching your search.
                </div>
              )}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
