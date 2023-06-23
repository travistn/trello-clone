import ListCard from './ListCard';

const Board = () => {
  return (
    <div className='w-full p-8 flex flex-row gap-4 max-sm:flex-col max-sm:items-center'>
      <ListCard title='Doing' />
      <ListCard title='To Do' />
      <ListCard title='Done' />
    </div>
  );
};

export default Board;
