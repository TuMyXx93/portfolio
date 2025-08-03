type Resource = {
  type: 'image' | 'font' | 'script';
  url: string;
};

export const preloadResources = async (
  resources: Resource[],
  onProgress?: (progress: number) => void
): Promise<void> => {
  const total = resources.length;
  let loaded = 0;

  const loadResource = async (resource: Resource): Promise<void> => {
    try {
      switch (resource.type) {
        case 'image':
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = resource.url;
          });
          break;
        case 'font':
          await document.fonts.load(`1em "${resource.url}"`);
          break;
        case 'script':
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = resource.url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
          break;
      }
      loaded++;
      onProgress?.(Math.round((loaded / total) * 100));
    } catch (error) {
      console.error(`Error loading resource ${resource.url}:`, error);
    }
  };

  await Promise.all(resources.map(loadResource));
};
