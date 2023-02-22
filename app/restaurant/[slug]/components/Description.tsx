type description= {
    description:string
}

function Description({description}:description) {
  return (
        <div className="mt-4">
          <p className="text-lg font-light">
            {description}
          </p>
        </div>
  )
}

export default Description