import { z } from "zod";

export type ImageData = z.infer<typeof imageDataSchema>;

export const imageDataSchema = z.object({
  name: z.string(),
  urlPath: z.string(),
  imageName: z.string(),
});

export type ImageYaml = z.infer<typeof imageYamlSchema>;

export const imageYamlSchema = z.array(imageDataSchema);
