

export default function Page() {
  return (
    <div className='container mx-auto grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <div className='col-span-2'>
        <h1 className='prose-h1'>Dashboard</h1>
        <p className='prose-p'>This is the dashboard.</p>
      </div>
    </div>
  );
}