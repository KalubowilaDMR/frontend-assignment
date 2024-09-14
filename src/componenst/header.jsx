import { MdExitToApp } from "react-icons/md";
import PropTypes from 'prop-types';

const Header = ({name}) => {
  return (
    <>
        <header className="w-full bg-white shadow-md px-5 py-5">
            <div className="flex flex-row justify-between">
                <h1 className="font-bold text-2xl text-black/80">ToDo - Dashboard</h1>
                <div className="flex flex-row items-center gap-3">
                    <legend className="font-semibold text-[#767676]">{name}</legend>
                    <button className="btn bg-[#8660EB] px-3 py-2 font-medium hover:bg-[#7950eb] hover:shadow-xl">
                      <MdExitToApp className="w-5 h-5 text-white/80 font-semibold"/>
                    </button>
                </div>
            </div>
        </header>
    </>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired
}

export default Header