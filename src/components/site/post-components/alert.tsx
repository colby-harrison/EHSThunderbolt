import * as Alert from "@/components/ui/alert";

export default function AlertComponent({ title, description, type = "default" }: { title: string, description: string, type: Alert.variants["variant"] }) {
  return (
    <Alert.Alert variant={type}>
      <Alert.AlertTitle>{title}</Alert.AlertTitle>
      <Alert.AlertDescription>{description}</Alert.AlertDescription>
    </Alert.Alert>
  );
}