import React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers'
import ptLocale from 'date-fns/locale/pt-BR'
import { makeStyles } from '@mui/styles'
import InputMask from 'react-input-mask'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import AlertBar from '../ui/AlertBar'

const useStyles = makeStyles(theme => ({
    form: {
        maxWidth: '90%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        '& .MuiFormControl-root': {
            minWidth: '200px',
            maxWidth: '500px',
            marginBottom: '24px'
        }
    },
    toolbar: {
        width: '100%',
        justifyContent: 'space-around'
    }

}))

// const unidadesFed = [
//     { sigla: 'DF', nome: 'Distrito Federal' },
//     { sigla: 'ES', nome: 'Espírito Santo' },
//     { sigla: 'GO', nome: 'Goiás' },
//     { sigla: 'MS', nome: 'Mato Grosso do Sul' },
//     { sigla: 'MG', nome: 'Minas Gerais' },
//     { sigla: 'PR', nome: 'Paraná' },
//     { sigla: 'RJ', nome: 'Rio de Janeiro' },
//     { sigla: 'SP', nome: 'São Paulo' }
// ]

// const turmas = [
//     { sigla: 'ESP10', descricao: '[ESP10] Espanhol iniciante' },
//     { sigla: 'FRA10', descricao: '[FRA10] Francês iniciante' },
//     { sigla: 'ING10', descricao: '[ING10] Inglês iniciante' }
// ]

export default function AlunoForm() {

    const classes = useStyles()

    const [state, setState] = React.useState(
        // Lazy initalizer
        () => ({
            // Campos correspondentes a controles de seleção
            // precisam ter um valor inicial  
            aluno: { uf: '', turma: '' },
            alertSeverity: 'success',
            isAlertOpen: false,
            alertMessage: ''
        })
    )
    const {
        aluno,
        alertSeverity,
        isAlertOpen,
        alertMessage
    } = state

    function handleInputChange(event, fieldName = event.target.id) {
        console.log(`fieldName: ${fieldName}, value: ${event?.target?.value}`)

        // Sincroniza o valor do input com a variável de estado
        const newAluno = {...aluno}     // Tira uma cópia do aluno

        // O componente DesktopDatePicker envia newValue em vez de
        // event; portanto, é necessário tratamento específico para ele
        if(fieldName === 'sigla') newAluno[fieldName] = event
        else newAluno[fieldName] = event.target.value // Atualiza o campo
        
        setState({ ...state, aluno: newAluno })
    }

    function handleAlertClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
    
        // Fecha a barra de alerta
        setState({...state, isAlertOpen: false})
    }

    return (
        <>
            <AlertBar 
                severity={alertSeverity} 
                open={isAlertOpen}
                onClose={handleAlertClose}
            >
                {alertMessage}
            </AlertBar>
            
            <h1>Cadastro de Curso</h1>

            <form className={classes.form}>
                
                <TextField 
                    id="nome" 
                    label="Nome completo"
                    value={aluno.nome}
                    variant="filled"
                    placeholder="Informe o nome completo do(a) Professor(a)"
                    required
                    fullWidth
                    onChange={handleInputChange}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptLocale}>
                    <DesktopDatePicker
                        label="Sigla"
                        inputFormat="text"
                        value={aluno.sigla}
                        onChange={newValue => handleInputChange(newValue, 'sigla')}
                        renderInput={(params) => <TextField
                            id="sigla"
                            variant="filled"
                            required
                            fullWidth                             
                            {...params} 
                        />}
                    />
                </LocalizationProvider>

                <TextField 
                    id="descricao" 
                    label="Descrição"
                    value={aluno.descricao}
                    variant="filled"
                    placeholder="Descrição"
                    required
                    fullWidth
                    onChange={handleInputChange}
                />

                <InputMask
                    value={aluno.duracao_meses}
                    onChange={event => handleInputChange(event, 'duracao_meses')}
                >
                    {
                        () => <TextField 
                            id="duracao_meses" 
                            label="duracao_meses"
                            variant="filled"
                            placeholder="Informe a Duração do curso"
                            required
                            fullWidth
                        />
                    }
                </InputMask>

                <TextField 
                    id="carga_horaria" 
                    label="Carga horaria"
                    value={aluno.logradouro}
                    variant="filled"
                    placeholder="Informe a Carga horaria"
                    required
                    fullWidth
                    onChange={handleInputChange}
                />

                <TextField 
                    id="valor_total" 
                    label="$"
                    value={aluno.valor_total}
                    variant="filled"
                    placeholder="Informe o valor a receber"
                    required
                    fullWidth
                    onChange={handleInputChange}
                />

                <Toolbar className={classes.toolbar}>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Enviar
                    </Button>
                    <Button
                        variant="outlined"
                    >
                        Voltar
                    </Button>
                </Toolbar>

            </form>

            <p>{JSON.stringify(aluno)}</p>
        </>
    )
}