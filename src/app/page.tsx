import Category from './(main)/_component/Category/Category';
import FeedList from './(main)/_component/Feed/FeedList';
import MainTop from './(main)/_component/MainTop/MainTop';
import MonthlyTheme from './(main)/_component/MonthlyTheme/MonthlyTheme';
import RecommendList from './(main)/_component/RecommendFeed/RecommendList';

export default async function Home() {
  return (
    <div>
      <div className="flex flex-col text-sm">
        <MainTop />
        <Category />
        <div className="flex flex-col desktop:flex-row tablet:flex-col laptop:flex-row justify-between w-full">
          <FeedList />
          <div className="desktop:ml-8 laptop:ml-8">
            <MonthlyTheme />
            <RecommendList />
          </div>
        </div>
      </div>
    </div>
  );
}
