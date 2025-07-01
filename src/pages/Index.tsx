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
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <h1 className="text-3xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-success bg-clip-text text-transparent leading-tight">
            One Click Total Clarity
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold mb-4 text-foreground">
            Know the Cost and Carbon of Your Digital Platform
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform complex cloud infrastructure data into actionable insights. 
            Track spending, measure carbon footprint, and optimize your digital operations with enterprise-grade precision.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <Card className="shadow-2xl border-2 border-primary/10 hover:border-primary/20 transition-all duration-300 backdrop-blur-sm bg-card/95">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-full bg-gradient-to-br from-primary to-primary-glow">
                  <Cloud className="w-5 h-5 text-primary-foreground" />
                </div>
                Digital Platform Analytics
              </CardTitle>
              <CardDescription className="text-base">
                Collect your cloud infrastructure data to unlock cost and carbon insights
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="organization" className="text-base font-medium">Organization Name</Label>
                  <Input
                    id="organization"
                    placeholder="e.g., Acme Corporation"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    required
                    className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="provider" className="text-base font-medium">Primary Cloud Provider</Label>
                  <Select value={formData.provider} onValueChange={(value) => setFormData({...formData, provider: value})} required>
                    <SelectTrigger className="h-12 text-base border-2 focus:border-primary/50">
                      <SelectValue placeholder="Select your main cloud provider" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-sm">
                      {cloudProviders.map((provider) => (
                        <SelectItem key={provider.value} value={provider.value} className="text-base">
                          {provider.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="services" className="text-base font-medium">Service Categories</Label>
                  <Select value={formData.services} onValueChange={(value) => setFormData({...formData, services: value})} required>
                    <SelectTrigger className="h-12 text-base border-2 focus:border-primary/50">
                      <SelectValue placeholder="Select primary service type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-sm">
                      {serviceCategories.map((service) => (
                        <SelectItem key={service.value} value={service.value} className="text-base">
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="monthlySpend" className="text-base font-medium">Estimated Monthly Spend (USD)</Label>
                  <Input
                    id="monthlySpend"
                    type="number"
                    placeholder="e.g., 5000"
                    value={formData.monthlySpend}
                    onChange={(e) => setFormData({...formData, monthlySpend: e.target.value})}
                    required
                    className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="primaryUse" className="text-base font-medium">Primary Use Case</Label>
                  <Input
                    id="primaryUse"
                    placeholder="e.g., Web application hosting, Data analytics"
                    value={formData.primaryUse}
                    onChange={(e) => setFormData({...formData, primaryUse: e.target.value})}
                    required
                    className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="notes" className="text-base font-medium">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional details about your cloud infrastructure..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={4}
                    className="text-base border-2 focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full h-14 text-lg font-semibold">
                  🚀 Analyze Platform Impact
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results & Demo Info */}
          <div className="space-y-6">
            {/* Submissions */}
            <Card className="shadow-xl border-2 border-success/10 hover:border-success/20 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-success/5 to-primary/5 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-full bg-gradient-to-br from-success to-primary">
                    <Database className="w-5 h-5 text-primary-foreground" />
                  </div>
                  Collected Insights ({submissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {submissions.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                      <ChartBar className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-lg">
                      No insights yet. Fill out the form to see data collection in action!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.slice(-3).map((submission) => (
                      <div key={submission.id} className="p-4 bg-gradient-to-r from-muted/30 to-muted/50 rounded-xl border border-muted hover:border-primary/30 transition-colors">
                        <div className="font-semibold text-lg">{submission.organization}</div>
                        <div className="text-muted-foreground flex items-center gap-2">
                          <Badge variant="outline">{submission.provider}</Badge>
                          <span>•</span>
                          <span className="font-medium">${submission.monthlySpend}/month</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">{submission.timestamp}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lovable Pros & Cons */}
            <Card className="shadow-xl border-2 border-warning/10 hover:border-warning/20 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-warning/5 to-primary-glow/5 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-full bg-gradient-to-br from-warning to-primary-glow">
                    <ChartBar className="w-5 h-5 text-primary-foreground" />
                  </div>
                  Lovable Platform Analysis
                </CardTitle>
                <CardDescription className="text-base">Honest assessment of building this solution with Lovable</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-success/5 to-success/10 border border-success/20">
                  <h4 className="font-semibold text-success mb-3 flex items-center gap-2 text-lg">
                    <CheckCircle2 className="w-5 h-5" />
                    Why Lovable Excels
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {prosAndCons.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-success mt-1 text-lg">✓</span>
                        <span className="text-foreground">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-destructive/5 to-destructive/10 border border-destructive/20">
                  <h4 className="font-semibold text-destructive mb-3 flex items-center gap-2 text-lg">
                    <XCircle className="w-5 h-5" />
                    Current Limitations (Solvable)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {prosAndCons.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-destructive mt-1 text-lg">→</span>
                        <span className="text-foreground">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary-glow/5 border border-primary/20">
                  <p className="font-medium text-primary mb-2">🚀 Production Ready Path</p>
                  <p className="text-sm text-foreground">
                    Connect to <strong>Supabase</strong> for enterprise functionality: authentication, 
                    data persistence, API integrations, and advanced analytics capabilities.
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
