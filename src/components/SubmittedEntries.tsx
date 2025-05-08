import type { SubmittedEntry } from "../types/form-types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";



interface SubmittedEntriesProps {
  entries: SubmittedEntry[];
  clearEntries: () => void;
}

const CATEGORIES = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  nextjs: "Next.js",
  nodejs: "Node.js",
  vuejs: "Vue.js",
  angular: "Angular",
  svelte: "Svelte",
  graphql: "GraphQL",
  webdev: "Web Development",
};


const SubmittedEntries = ({ entries, clearEntries }: SubmittedEntriesProps) => {
  if (!entries.length) return null;

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Submitted Entries</h2>
        {entries.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={clearEntries}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {entries.map((entry) => (
          <Card key={entry.id} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-4">Personal & Contact Info</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Name:</span>{" "}
                    <span>{entry.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>{" "}
                    <span>{entry.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Address:</span>{" "}
                    <span>{entry.address}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>{" "}
                    <span>{entry.phone}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {entry.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                    >
                      {CATEGORIES[category as keyof typeof CATEGORIES]}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Submitted: {new Date(entry.submittedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubmittedEntries;