import { ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import type { InfoLink } from "@/type";

export default function InfoLinks({ tool }: { readonly tool: InfoLink }) {
  return (
      <li key={tool.url} className="flex items-center space-x-2">
      {tool.name && <Badge variant="outline">{tool.name}</Badge>}
      <span className="text-muted-foreground">{tool.description}</span>
      <a title="Abrir enlace" href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">
        <ExternalLink className="ml-1 h-4 w-4" />
      </a>
    </li>
  );
}