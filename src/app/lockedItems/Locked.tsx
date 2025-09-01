export function Locked({ onClose }: { onClose: () => void }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4 space-y-4'>
      <p className='text-white text-lg'>Sign In to Continue.</p>
      <button
        className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all'
        onClick={onClose}>
        Back
      </button>
    </div>
  );
}
