import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Cloud, Database, ChartBar } from "lucide-react";

const cloudProviders = [
  { value: "aws", label: "Amazon Web Services (AWS)" },
  { value: "gcp", label: "Google Cloud Platform (GCP)" },
  { value: "azure", label: "Microsoft Azure" },
  { value: "digitalocean", label: "DigitalOcean" },
  { value: "other", label: "Other" },
];

const serviceCategories = [
  { value: "compute", label: "Compute (EC2, VMs, App Engine)" },
  { value: "storage", label: "Storage (S3, Cloud Storage, Blob)" },
  { value: "database", label: "Database (RDS, CloudSQL, CosmosDB)" },
  { value: "networking", label: "Networking (VPC, Load Balancer, CDN)" },
  { value: "serverless", label: "Serverless (Lambda, Functions, Logic Apps)" },
  { value: "ai-ml", label: "AI/ML Services" },
  { value: "analytics", label: "Analytics & Big Data" },
  { value: "security", label: "Security & Identity" },
];

const Index = () => {
  const [formData, setFormData] = useState({
    organization: "",
    provider: "",
    services: "",
    monthlySpend: "",
    primaryUse: "",
    notes: ""
  });
  const [submissions, setSubmissions] = useState<any[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSubmission = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toLocaleDateString()
    };
    
    setSubmissions([...submissions, newSubmission]);
    
    toast({
      title: "Cloud Service Data Recorded!",
      description: `Added ${formData.provider} services for ${formData.organization}`,
    });
    
    // Reset form
    setFormData({
      organization: "",
      provider: "",
      services: "",
      monthlySpend: "",
      primaryUse: "",
      notes: ""
    });
  };

  const prosAndCons = {
    pros: [
      "Rapid prototyping - Built this entire form in minutes",
      "No backend setup needed initially",
      "Beautiful UI components out of the box",
      "Responsive design automatically",
      "Easy deployment and sharing",
      "Perfect for MVPs and demos"
    ],
    cons: [
      "Limited to frontend-only without Supabase integration",
      "No data persistence without backend",
      "Cannot integrate with real cloud APIs yet",
      "No user authentication in basic setup",
      "R calculations would need backend integration"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow"></div>
            <h1 className="text-xl font-bold">CloudServices Demo</h1>
          </div>
          <Badge variant="outline">Demo for Harsh</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Cloud Provider Services Collector
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Demonstration webapp for collecting cloud infrastructure data - built with Lovable
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="w-5 h-5" />
                Cloud Services Information
              </CardTitle>
              <CardDescription>
                Fill out your organization's cloud infrastructure details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization Name</Label>
                  <Input
                    id="organization"
                    placeholder="e.g., Acme Corporation"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provider">Primary Cloud Provider</Label>
                  <Select value={formData.provider} onValueChange={(value) => setFormData({...formData, provider: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your main cloud provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {cloudProviders.map((provider) => (
                        <SelectItem key={provider.value} value={provider.value}>
                          {provider.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="services">Service Categories</Label>
                  <Select value={formData.services} onValueChange={(value) => setFormData({...formData, services: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlySpend">Estimated Monthly Spend (USD)</Label>
                  <Input
                    id="monthlySpend"
                    type="number"
                    placeholder="e.g., 5000"
                    value={formData.monthlySpend}
                    onChange={(e) => setFormData({...formData, monthlySpend: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryUse">Primary Use Case</Label>
                  <Input
                    id="primaryUse"
                    placeholder="e.g., Web application hosting, Data analytics"
                    value={formData.primaryUse}
                    onChange={(e) => setFormData({...formData, primaryUse: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional details about your cloud infrastructure..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Cloud Data
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results & Demo Info */}
          <div className="space-y-6">
            {/* Submissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Collected Data ({submissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submissions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No submissions yet. Fill out the form to see data collection in action!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {submissions.slice(-3).map((submission) => (
                      <div key={submission.id} className="p-3 bg-muted/50 rounded-lg">
                        <div className="font-medium">{submission.organization}</div>
                        <div className="text-sm text-muted-foreground">
                          {submission.provider} • ${submission.monthlySpend}/month
                        </div>
                        <div className="text-xs text-muted-foreground">{submission.timestamp}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lovable Pros & Cons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartBar className="w-5 h-5" />
                  Lovable Demo Analysis
                </CardTitle>
                <CardDescription>Pros and cons of building this with Lovable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-success mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Pros
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {prosAndCons.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success mt-1">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-destructive mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Limitations (Solvable)
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {prosAndCons.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-destructive mt-1">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Next Step:</strong> Connect to Supabase for backend functionality including 
                    authentication, data persistence, API integrations, and advanced analytics.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-primary-glow"></div>
            <span className="font-semibold">Built with Lovable</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Frontend demo ready for deployment • Add Supabase for full functionality
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
