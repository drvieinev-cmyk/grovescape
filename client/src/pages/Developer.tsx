/**
 * Developer Dashboard
 * Manage OAuth applications and API keys
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Plus, Copy, Trash2, Key, Code } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Developer() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [createAppOpen, setCreateAppOpen] = useState(false);
  const [createKeyOpen, setCreateKeyOpen] = useState(false);
  const [newClientData, setNewClientData] = useState<any>(null);
  const [newApiKeyData, setNewApiKeyData] = useState<any>(null);

  // OAuth App Form
  const [appForm, setAppForm] = useState({
    name: "",
    redirectUri: "",
  });

  // API Key Form
  const [keyForm, setKeyForm] = useState({
    name: "",
    expiresInDays: 90,
  });

  const { data: clients, refetch: refetchClients } = trpc.oauth.listClients.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: apiKeys, refetch: refetchApiKeys } = trpc.oauth.listApiKeys.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const createClientMutation = trpc.oauth.createClient.useMutation({
    onSuccess: (data) => {
      setNewClientData(data);
      toast.success("OAuth application created successfully!");
      refetchClients();
      setAppForm({ name: "", redirectUri: "" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const createApiKeyMutation = trpc.oauth.createApiKey.useMutation({
    onSuccess: (data) => {
      setNewApiKeyData(data);
      toast.success("API key created successfully!");
      refetchApiKeys();
      setKeyForm({ name: "", expiresInDays: 90 });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const revokeApiKeyMutation = trpc.oauth.revokeApiKey.useMutation({
    onSuccess: () => {
      toast.success("API key revoked successfully!");
      refetchApiKeys();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateApp = (e: React.FormEvent) => {
    e.preventDefault();
    createClientMutation.mutate({
      name: appForm.name,
      redirectUris: [appForm.redirectUri],
    });
  };

  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    createApiKeyMutation.mutate(keyForm);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-8">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Developer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your OAuth applications and API keys
          </p>
        </div>

        <Tabs defaultValue="oauth" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="oauth">
              <Code className="w-4 h-4 mr-2" />
              OAuth Apps
            </TabsTrigger>
            <TabsTrigger value="apikeys">
              <Key className="w-4 h-4 mr-2" />
              API Keys
            </TabsTrigger>
          </TabsList>

          {/* OAuth Applications Tab */}
          <TabsContent value="oauth" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>OAuth 2.0 Applications</CardTitle>
                    <CardDescription>
                      Create applications that can request access on behalf of users
                    </CardDescription>
                  </div>
                  <Dialog open={createAppOpen} onOpenChange={setCreateAppOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Application
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create OAuth Application</DialogTitle>
                        <DialogDescription>
                          Register a new application to use OAuth 2.0 authorization
                        </DialogDescription>
                      </DialogHeader>
                      {newClientData ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                              ⚠️ Save these credentials now!
                            </p>
                            <p className="text-xs text-yellow-700 dark:text-yellow-300">
                              The client secret will only be shown once. Store it securely.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label>Client ID</Label>
                            <div className="flex gap-2">
                              <Input value={newClientData.clientId} readOnly />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => copyToClipboard(newClientData.clientId)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Client Secret</Label>
                            <div className="flex gap-2">
                              <Input value={newClientData.clientSecret} readOnly />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => copyToClipboard(newClientData.clientSecret)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              setNewClientData(null);
                              setCreateAppOpen(false);
                            }}
                            className="w-full"
                          >
                            Done
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handleCreateApp} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="appName">Application Name</Label>
                            <Input
                              id="appName"
                              placeholder="My Application"
                              value={appForm.name}
                              onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="redirectUri">Redirect URI</Label>
                            <Input
                              id="redirectUri"
                              type="url"
                              placeholder="https://example.com/callback"
                              value={appForm.redirectUri}
                              onChange={(e) =>
                                setAppForm({ ...appForm, redirectUri: e.target.value })
                              }
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full" disabled={createClientMutation.isPending}>
                            {createClientMutation.isPending ? "Creating..." : "Create Application"}
                          </Button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {clients && clients.length > 0 ? (
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <Card key={client.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{client.name}</CardTitle>
                          <CardDescription>
                            Client ID: {client.clientId}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Label className="text-sm">Redirect URIs</Label>
                            <ul className="text-sm text-muted-foreground list-disc list-inside">
                              {client.redirectUris.map((uri, idx) => (
                                <li key={idx}>{uri}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No OAuth applications yet. Create one to get started.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="apikeys" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Generate API keys for machine-to-machine authentication
                    </CardDescription>
                  </div>
                  <Dialog open={createKeyOpen} onOpenChange={setCreateKeyOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New API Key
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create API Key</DialogTitle>
                        <DialogDescription>
                          Generate a new API key for server-to-server authentication
                        </DialogDescription>
                      </DialogHeader>
                      {newApiKeyData ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                              ⚠️ Save this API key now!
                            </p>
                            <p className="text-xs text-yellow-700 dark:text-yellow-300">
                              The key will only be shown once. Store it securely.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label>API Key</Label>
                            <div className="flex gap-2">
                              <Input value={newApiKeyData.key} readOnly className="font-mono text-xs" />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => copyToClipboard(newApiKeyData.key)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              setNewApiKeyData(null);
                              setCreateKeyOpen(false);
                            }}
                            className="w-full"
                          >
                            Done
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handleCreateApiKey} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="keyName">Key Name</Label>
                            <Input
                              id="keyName"
                              placeholder="Production Server"
                              value={keyForm.name}
                              onChange={(e) => setKeyForm({ ...keyForm, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expiresIn">Expires In (days)</Label>
                            <Input
                              id="expiresIn"
                              type="number"
                              min="1"
                              max="365"
                              value={keyForm.expiresInDays}
                              onChange={(e) =>
                                setKeyForm({ ...keyForm, expiresInDays: parseInt(e.target.value) })
                              }
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full" disabled={createApiKeyMutation.isPending}>
                            {createApiKeyMutation.isPending ? "Creating..." : "Create API Key"}
                          </Button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {apiKeys && apiKeys.length > 0 ? (
                  <div className="space-y-4">
                    {apiKeys.map((key) => (
                      <Card key={key.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{key.name}</CardTitle>
                              <CardDescription className="font-mono text-xs">
                                {key.keyPrefix}
                              </CardDescription>
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => revokeApiKeyMutation.mutate({ id: key.id })}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Created</p>
                              <p>{new Date(key.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Expires</p>
                              <p>
                                {key.expiresAt
                                  ? new Date(key.expiresAt).toLocaleDateString()
                                  : "Never"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No API keys yet. Create one to get started.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
