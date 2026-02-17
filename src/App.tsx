
import { AppLayout } from './components/layout/AppLayout';
import { Header } from './components/layout/Header';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Card } from './components/ui/Card';
import { Copy, Terminal } from 'lucide-react';

function App() {
  return (
    <AppLayout
      projectName="KodNest Premium Build System"
      stepCurrent={1}
      stepTotal={5}
      status="In Progress"
      header={
        <Header
          title="Component Library & Design System"
          subtitle="A demonstration of the calm, intentional, and coherent design language for high-trust B2C SaaS applications."
        />
      }
      panel={
        <div className="flex flex-col gap-6">
          <Card title="Current Step" description="Review the implementation of the design system.">
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700 font-mono leading-relaxed">
              Verify that all constraints from the 'Design Philosophy' are met. Background should be off-white, accent deep red.
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Button variant="secondary" className="w-full justify-between group">
                <span>Copy Instructions</span>
                <Copy className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-accent)]" />
              </Button>
              <Button variant="primary" className="w-full">
                Mark as Reviewed
              </Button>
            </div>
          </Card>

          <Card>
            <h4 className="font-serif font-bold text-lg mb-2">System Status</h4>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-[var(--color-success)] mr-3"></span>
                <span>Typography Loaded</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-[var(--color-success)] mr-3"></span>
                <span>Tokens Active</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-[var(--color-warning)] mr-3"></span>
                <span>Pending Validation</span>
              </div>
            </div>
          </Card>
        </div>
      }
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-serif font-bold mb-6">Input Components</h2>
          <Card className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Input label="Project Name" placeholder="e.g. Placement Readiness Platform" />
              <Input label="Domain" placeholder="e.g. education" />
            </div>
            <Input label="Description" placeholder="Briefly describe the project goals..." />
            <div className="flex justify-end pt-2">
              <Button variant="secondary">Save Draft</Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mb-6">Interaction States</h2>
          <div className="grid grid-cols-2 gap-6">
            <Card title="Button Variants">
              <div className="flex gap-4 mt-2">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
              </div>
              <div className="mt-6 flex gap-4">
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" isLoading>Loading</Button>
              </div>
            </Card>

            <Card title="Typography Scale">
              <div className="space-y-2">
                <h1 className="text-4xl font-serif font-bold">Heading 1</h1>
                <h2 className="text-3xl font-serif font-bold">Heading 2</h2>
                <h3 className="text-2xl font-serif font-bold">Heading 3</h3>
                <p className="text-base text-gray-600">Body text in Inter, clean and legible.</p>
              </div>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mb-6">Empty State Pattern</h2>
          <div className="border border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No Builds Generated Yet</h3>
            <p className="text-gray-500 max-w-sm mt-2 mb-6">
              Start by defining your project requirements in the panel to the right.
            </p>
            <Button>Create New Build</Button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

export default App;
