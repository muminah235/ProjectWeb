import './DrugItem.css'

function DrugItem(props) {
    const { title,thumbnailUrl } = props
    return (
        <div className="drug-item">
          <img src={thumbnailUrl} />
          <h4>{title}</h4>
        </div>
    );
}

export default DrugItem;