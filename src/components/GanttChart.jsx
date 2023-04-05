// MUI
import {
	Table,
	TableContainer,
	TableRow,
	TableCell,
	Paper,
	TableBody,
	Box,
	Typography
} from '@mui/material';
import { cyan, green, indigo, lime, orange, red } from '@mui/material/colors';

const GanttChart = props => {
	const { processes } = props;

	const colors = [
		green[400],
		cyan[300],
		orange[600],
		indigo[500],
		red['A400']
	];
	let currentColour = 0;

	let ganttProcesses = processes.sort(
		(p1, p2) => p1.completionTime - p2.completionTime
	);

	return (
		<TableContainer
			sx={{
				overflow: 'scroll',
				overscrollBehavior: 'contain',
				'&::-webkit-scrollbar': { display: 'none' }
			}}
		>
			<Table
				component={Paper}
				sx={{
					backdropFilter: 'blur(15px)'
				}}
			>
				<TableBody>
					{/* PID Row */}
					<TableRow
						sx={{
							'&:last-child td, &:last-child th': {
								border: 'none'
							}
						}}
					>
						<TableCell sx={{ width: '100px' }}>PID</TableCell>

						{/* Render a TableCell for PID of each process */}
						{ganttProcesses.map(process => (
							<TableCell
								key={process.pid}
								align='center'
								sx={{
									backgroundColor:
										colors[currentColour++ % colors.length]
								}}
							>
								{process.pid}
							</TableCell>
						))}
					</TableRow>

					{/* Time Row */}
					<TableRow
						sx={{
							'&:last-child td, &:last-child th': {
								border: 0
							}
						}}
					>
						<TableCell sx={{ width: '100px' }}>Time</TableCell>

						{/* First cell with flex */}
						<TableCell align='right'>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between'
								}}
							>
								<Typography>0</Typography>
								<Typography>
									{ganttProcesses[0]['completionTime']}
								</Typography>
							</Box>
						</TableCell>

						{/* Render a TableCell for completion time of each process */}
						{ganttProcesses.slice(1).map(process => (
							<TableCell key={process.pid} align='right'>
								{process.completionTime}
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default GanttChart;
