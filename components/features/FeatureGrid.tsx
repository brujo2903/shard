import { Zap, Shield, Cpu } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Deploy AI agents in seconds with our intuitive interface.',
  },
  {
    icon: Shield,
    title: 'Secure by Design',
    description: 'Enterprise-grade security with end-to-end encryption.',
  },
  {
    icon: Cpu,
    title: 'Advanced AI',
    description: 'Powered by state-of-the-art language models and neural networks.',
  },
];

export function FeatureGrid() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Shard?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 bg-background rounded-lg shadow-sm">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}