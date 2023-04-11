import Notes from "./Notes"


const Home = (props) => {
  const { showAlert } = props // D-structuring for showAlert
  return (
    <div>
      <Notes showAlert={showAlert} />
      {/* for show alert we are doing prop drilling here, as the application isn't that complext
      Alternative can be using context api */}
    </div>
  )
}

export default Home

