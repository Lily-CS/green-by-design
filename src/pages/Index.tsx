import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { CloudDataForm } from "@/components/CloudDataForm";
import { DashboardPreview } from "@/components/DashboardPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="features">
          <FeatureCards />
        </section>
        <section id="track">
          <CloudDataForm />
        </section>
        <section id="dashboard">
          <DashboardPreview />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-primary-glow"></div>
            <span className="font-semibold">CarbonTracker</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Helping organizations track and reduce their cloud carbon footprint
          </p>
          <div className="text-sm text-muted-foreground">
            <strong>Demo Notice:</strong> This is a frontend demonstration. For full functionality including 
            authentication, database storage, API integrations, and R-powered calculations, 
            connect to Supabase for backend services.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
