"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Globe,
  Shield,
  Plus,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import * as z from "zod";

export const domainSettingsSchema = z.object({
  primaryDomain: z.string().url("Please enter a valid URL"),
  customDomains: z.array(
    z.object({
      id: z.string(),
      domain: z
        .string()
        .regex(
          /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
          "Invalid domain format",
        ),
      status: z.enum(["active", "pending", "failed"]),
      sslStatus: z.enum(["active", "pending", "expired"]),
      createdAt: z.date(),
    }),
  ),
  forceSsl: z.boolean(),
  enableWww: z.boolean(),
  autoRenewSsl: z.boolean(),
});

export type DomainSettingsFormData = z.infer<typeof domainSettingsSchema>;

export function Domain() {
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [newDomain, setNewDomain] = useState("");

  const form = useForm<DomainSettingsFormData>({
    resolver: zodResolver(domainSettingsSchema),
    defaultValues: {
      primaryDomain: "https://myapp.com",
      customDomains: [
        {
          id: "1",
          domain: "example.com",
          status: "active",
          sslStatus: "active",
          createdAt: new Date(),
        },
      ],
      forceSsl: true,
      enableWww: false,
      autoRenewSsl: true,
    },
  });

  const onSubmit = (data: DomainSettingsFormData) => {
    console.log(data);
    // Handle form submission
  };

  const addDomain = () => {
    if (newDomain) {
      const newCustomDomain: {
        id: string;
        domain: string;
        status: "active" | "pending" | "failed";
        sslStatus: "active" | "pending" | "expired";
        createdAt: Date;
      } = {
        id: Date.now().toString(),
        domain: newDomain,
        status: "pending",
        sslStatus: "pending",
        createdAt: new Date(),
      };

      const currentDomains = form.getValues("customDomains");
      form.setValue("customDomains", [...currentDomains, newCustomDomain]);
      setNewDomain("");
      setShowAddDomain(false);
    }
  };

  const removeDomain = (id: string) => {
    const currentDomains = form.getValues("customDomains");
    form.setValue(
      "customDomains",
      currentDomains.filter((domain) => domain.id !== id),
    );
  };

  return (
    <div className="mx-5 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Domain Settings</h1>
          <p className="text-gray-500">Manage your domain and SSL settings</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Primary Domain
              </CardTitle>
              <CardDescription>
                Configure your primary domain settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="primaryDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Domain URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com"
                      />
                    </FormControl>
                    <FormDescription>
                      This is the main domain for your application
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableWww"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>WWW Redirect</FormLabel>
                      <FormDescription>
                        Automatically redirect to www version of your domain
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Custom Domains
              </CardTitle>
              <CardDescription>
                Manage your custom domains and SSL certificates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.watch("customDomains").map((domain) => (
                <div
                  key={domain.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{domain.domain}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge
                          variant={
                            domain.status === "active"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {domain.status === "active" ? (
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                          ) : (
                            <Clock className="w-4 h-4 mr-1" />
                          )}
                          {domain.status}
                        </Badge>
                        <Badge
                          variant={
                            domain.sslStatus === "active"
                              ? "default"
                              : "destructive"
                          }
                        >
                          <Shield className="w-4 h-4 mr-1" />
                          SSL {domain.sslStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDomain(domain.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {showAddDomain ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter domain name"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                  />
                  <Button onClick={addDomain}>Add</Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAddDomain(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowAddDomain(true)}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Custom Domain
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                SSL Settings
              </CardTitle>
              <CardDescription>
                Configure SSL certificate settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="forceSsl"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Force SSL</FormLabel>
                      <FormDescription>
                        Redirect all HTTP traffic to HTTPS
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autoRenewSsl"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Auto-renew SSL Certificates</FormLabel>
                      <FormDescription>
                        Automatically renew SSL certificates before expiry
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
