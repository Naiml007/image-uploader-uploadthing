import ImageUploader from '@/components/image-uploader'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ImageUploader />
    </main>
  )
}