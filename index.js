const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger)

let notes = [
    {   
        id: 1,
        author:"Aniche, M F and Testing, MA Gerosa Software and {Verification} and {and} and {2010}", 
        title:"Most common mistakes in test-driven development practice: Results from an online survey with developers",
        journal:"ieeexplore.ieee.org"
    },
    {
        id:2,
        author:"Janzen,D S & Saiidian, H",
        title:"Does Test-Driven Development Really Improve Software Design Quality?",
        journal:"Software IEEE",
        year:"2008",
        volume:"25",
        number:"2",
        pages:"77-84"
    },
    {
        id:3,
        title:"A prototype empirical evaluation of test driven development - Software Metrics, 2004. Proceedings. 10th International Symposium on",
        year:"2001",
        month:"aug"
    },
    {
        id:4,
        author:"Romano, Simone and Fucci, Davide and Baldassarre, Maria Teresa and Caivano, Danilo and Scanniello, Giuseppe",
        title:"An Empirical Assessment on Affective Reactions of Novice Developers when Applying Test-Driven Development",
        journal:"arXiv.org",
        year:"2019",
        eprint:"1907.12290",
        eprinttype:"arXiv",
        pages:"arXiv:1907.12290",
        month:"jul",
        annote:"Accepted for publication at the 20th International Conference on Product-Focused Software Process Improvement (PROFES19)"
    },
    {
        id:5,
        title:"Evaluating Test-Driven Development in an Industry-Sponsored Capstone Project",
        year:"2009",
        publisher:"IEEE",
        month:"mar"
    },
    {
        id:6,
        author:"Siniaalto, Maria and Abrahamsson, Pekka",
        title:"A Comparative Case Study on the Impact of Test-Driven Development on Program Design and Test Coverage",
        journal:"arXiv.org",
        year : "2017",
        eprint : "1711.05082",
        eprinttype : "arxiv",
        eprintclass : "cs.SE",
        pages : "arXiv:1711.05082",
        month : "nov",
        annote : "This is author's version of the published paper. The copyright holder's version is accessible at http://ieeexplore.ieee.org/abstract/document/4343755/"
    },
    {
        id:7,
        author : "Romano, Simone and Scanniello, Giuseppe and Baldassarre, Maria Teresa and Fucci, Davide and Caivano, Danilo",
        title : "Results from a replicated experiment on the affective reactions of novice developers when applying test-driven development",
        journal : "arXiv.org",
        year :"2020",
        eprint : "2004.07524",
        eprinttype : "arxiv",
        eprintclass : "cs.SE",
        pages : "arXiv:2004.07524",
        month : "apr",
        annote : "XP2020"
    },
    {
        id:8,
        title:"On the Influence of Test-Driven Development on Software Design",
        year:"2006",
        pages:"1-8",
        month:"mar"
    },
    {
        id:9,
        title:"A Leveled Examination of Test-Driven Development Acceptance",
        year:"2007",
        pages:"1-4",
        month:"jan"
    },
    {
        id:10,
        title:"Evaluating the Efficacy of Test-Driven Development: Industrial Case Studies",
        year:"2006",
        pages:"1-8",
        month:"jul"
    },
    {
       id:11,
       author:"Canfora, Gerardo} and {Cimitile, Aniello} and {Garcia, Felix} and {Piattini, Mario} and {Visaggio, and Corrado Aaron}",
       title:"LNCS 4034 - Productivity of Test Driven Development: A Controlled Experiment with Professionals",
       year:"2006",
       pages:"1-6",
       month:"apr" 
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})