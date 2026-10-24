
import { pipeline } from "@huggingface/transformers";
import type { FeatureExtractionPipeline } from "@huggingface/transformers";

let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;

async function getExtractor(): Promise<FeatureExtractionPipeline> {
  if (!extractorPromise) {
    extractorPromise = pipeline(
      "feature-extraction",
      "Xenova/bge-large-en-v1.5"
    ) as Promise<FeatureExtractionPipeline>;
  }

  return extractorPromise;
}

export const generateEmbedding = async (
  text: string
): Promise<number[]> => {
  const extractor = await getExtractor();
  
  const result = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  const embedding = Array.from(result.data as Float32Array);
  // console.log(embedding);

  if (embedding.length !== 1024) {
    throw new Error(
      `Invalid embedding dimensions: ${embedding.length}`
    );
  }

  return embedding;
};
